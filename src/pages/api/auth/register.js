import { withSessionRoute } from "@/lib/withSession"

import excuteQuery from "@/services/mysql"
import md5 from "@/utils/md5"

export default withSessionRoute(
    async function handler(req, res) {
        const {
            email,
            password,
            firstname,
            lastname,
            confirmpassword } = req.body

        // Check if password match with confirmpassword
        if (password != confirmpassword) return res.send({ ok: false })

        // Check if all field filled
        if (!email || !password || !firstname || !lastname) return res.send({ ok: false })

        const result = await excuteQuery({
            query: `INSERT
                      INTO tb_users
                    VALUES (null, ?, ?, ?, ?)`,
            values: [email, md5(password), firstname, lastname],
        });

        if(result.error) return res.send({ ok: false })
        res.send({ ok: true })
    }
)