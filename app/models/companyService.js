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
                        company_services.description,
                        company_services.latlng,
                        company_services.address
                    FROM services
                        INNER JOIN company_services ON services.id = company_services.service_id
                    WHERE company_services.user_id = $1`;

        return this.execute(sql, [userId])
    }

    async withServicesById(id) {
        const sql =`SELECT company_services.id as company_service_id,
                        company_services.service_id,
                        company_services.activated, 
                        services.name,
                        company_services.description,
                        company_services.latlng,
                        company_services.address
                    FROM services
                        INNER JOIN company_services ON services.id = company_services.service_id
                    WHERE company_services.id = $1`;

        return this.execute(sql, [id])
    }

    async withServicesByservicesId(id) {
        const sql =`SELECT company_services.id as company_service_id,
                        company_services.service_id,
                        company_services.activated, 
                        services.name,
                        company_services.description,
                        company_services.latlng,
                        company_services.address,
                        company_services.mobile
                    FROM services
                        INNER JOIN company_services ON services.id = company_services.service_id
                    WHERE company_services.service_id = $1`;

        return this.execute(sql, [id])
    }

    async withServicesAll() {
        const sql =`SELECT company_services.id as company_service_id,
                        company_services.service_id,
                        company_services.activated, 
                        services.name,
                        company_services.description,
                        company_services.latlng,
                        company_services.address
                    FROM services
                        INNER JOIN company_services ON services.id = company_services.service_id`;

        return this.execute(sql)
    }
}

module.exports = CompanyService