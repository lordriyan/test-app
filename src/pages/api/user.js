import excuteQuery from "@/services/mysql";

export default async function handler(req, res) {
    const result = await excuteQuery({
        query: `SELECT *
                  FROM tb_users`,
        values: [],
    });

    res.status(200).json(
        result
    )
}


