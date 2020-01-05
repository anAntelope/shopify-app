import sendEmail from "../../email_manager/emailSender";

export default (req, res) => {
    if (req.method !== "POST"){
        // console.log(req)

        res.status(405).end("<h1>405 wrong method</h1>")
    }
    else{
        const receiver = req.query.receiver
        if (receiver){

            try{
                sendEmail(receiver)
                res.status(201).end(`email sent to ${receiver}`)
            }catch (e){
                res.status(500).end(`Internal Server Error happened during sending\n` + e)
            }



        }
        else{
            res.status(422).end("missing parameter \"receiver\" in the request")
        }

    }

};
