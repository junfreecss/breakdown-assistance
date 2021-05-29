const Model = require('./model')

class CompanyService extends Model {

    constructor() {
        super('company_services')
    }

    async withServices(userId) {
        const sql =`SELECT company_services.id as company_service_id,
                        company_services.service_id,
                        company_services.activated, 
                        services.name, 
                        services.description
                    FROM services
                        INNER JOIN company_services ON services.id = company_services.service_id
                    WHERE company_services.user_id = $1`;

        return this.execute(sql, [userId])
    }
}

module.exports = CompanyService