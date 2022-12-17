import { withSessionRoute } from "@/lib/withSession"

import excuteQuery from "@/services/mysql"
import md5 from "@/utils/md5"
import _ from "lodash"

export default withSessionRoute(
    async function handler(req, res) {
        const { email, password } = req.body

        const result = await excuteQuery({
            query: `SELECT *
                      FROM tb_users
                     WHERE email = ?
                       AND password = ?`,
            values: [email, md5(password)],
        });

        if (!_.isEmpty(result)) {
            req.session.user = result[0]
            await req.session.save()
            return res.send({ ok: true })
        }
        res.send({ ok: false })
    }
)