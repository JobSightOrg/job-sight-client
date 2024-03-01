import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType;

const redisClientSingleton = async (): Promise<RedisClientType> => {
  if (!redisClient) {
    redisClient = createClient({
      password: process.env.REDIS_PASSWORD ?? "",
      socket: {
        host: process.env.REDIS_HOST ?? "",
        port: parseInt(process.env.REDIS_PORT ?? ""),
      },
    });

    redisClient.on("error", (err) => console.error(`Redis Error: ${err}`));
    redisClient.on("connect", () => console.log("Redis connected"));
    redisClient.on("reconnecting", () => console.log("Redis reconnecting"));
    redisClient.on("ready", () => console.log("Redis ready!"));

    await redisClient.connect();
  }

  return redisClient;
};

type RedisClientSingleton = ReturnType<typeof redisClientSingleton>;

const globalForRedis = globalThis as unknown as {
  redis: RedisClientSingleton | undefined;
};

const redis = globalForRedis.redis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
