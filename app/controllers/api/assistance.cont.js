var model = require('../../models/datasource')
var notif = require('../../helpers/notification')

exports.getAssistance = async (req, resp) => {
    const { mechanic_id, service_id, user_id, lat, lng  } = req.body

    console.log('req.body', req.body);

    try {

        var recieverTk = null
        var serviceLoc = null
        var client = await model.user.findById(user_id)

        console.log('mechanic_id', mechanic_id);

        if (mechanic_id !== null && mechanic_id !== undefined) {
            var fcm = await model.fcmToken.select('user_id', mechanic_id)
            console.log('fcm mechanic_id', fcm.rows);
            recieverTk = fcm.rows[0].token

        } else {
            const companyService = await model.companyService.findById(service_id)
            var fcm = await model.fcmToken.select('user_id', companyService.rows[0].user_id)
            console.log('companyService service_id', companyService.rows);
            console.log('fcm service_id', fcm.rows);
            recieverTk = fcm.rows[0].token
            serviceLoc = companyService.rows[0].latlng
        }

        var detail = {
            client: client.rows[0],
            mechanic_id: mechanic_id,
            service_id: service_id,
            client_loc: {
                lat: lat,
                lng: lng
            },
            service_loc: serviceLoc
        }

        var content = {
            data: {
                type: 'get-assistance',
                content: JSON.stringify(detail)
            },
            notification: {
                title: 'Assistance Accepted',
                body: ''
            }
        }

        await notif.send(recieverTk, content)

        return resp.status(200).send({
            status: true, 
            alert: detail
        });
        
    } catch (error) {
        console.log('[assistance getAssistance controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.accept = async (req, resp) => {
    var { company_service_id, mechanic_id, client_id, client_loc } = req.body

    try {

        var jobs = await model.job.insert(
            'company_service_id, mechanic_id, client_id, client_loc, status',
            [  company_service_id, mechanic_id, client_id, client_loc, 'on-progress' ]
        )

        var content = {
            data: {
                type: 'assistance-accepted',
                content: 'Assistance is coming'
            },
            notification: {
                title: 'Get Assistance',
                body: 'Your request has been accepted. Mechanic is on your way!'
            }
        }
        
        await notif.sendTo(client_id, content)

        return resp.status(200).send({
            status: true, 
            jobs: jobs.rows[0]
        });

    } catch (error) {
        console.log('[assistance accept controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.refuse = async (req, resp) => {
    var { client_id } = req.body

    try {
        
        var content = {
            data: {
                type: 'assistance-refused',
                content: 'Assistance is refued'
            },
            
            notification: {
                title: 'Get Assistance',
                body: 'Sorry, your request has been refused.'
            }
        }
        
        await notif.sendTo(client_id, content)

        return resp.status(200).send({
            status: true, 
            message: 'Assistance succesfully refused!'
        });

    } catch (error) {
        console.log('[assistance refuse controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}   