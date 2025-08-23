import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") || "1", 10);

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const products = await db
      .collection("products")
      .aggregate([{ $sample: { size: count } }])
      .toArray();

    return Response.json(products);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
