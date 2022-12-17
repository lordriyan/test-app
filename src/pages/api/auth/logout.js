import { withSessionRoute } from "@/lib/withSession"

export default withSessionRoute(
    async function handler(req, res) {
        req.session.destroy();
        res.send({ ok: true })
    }
)