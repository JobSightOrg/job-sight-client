import amqp from "amqplib";

export default async function publishMessage(queueTask: string, message: any) {
  try {
    const connection = await amqp.connect(process.env.AMAZONMQ_URL!);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueTask);
    channel.sendToQueue(queueTask, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queueTask '${queueTask}': ${message}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Failed to send message to RabbitMQ:", error);
  }
}
