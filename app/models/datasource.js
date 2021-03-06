const Users = require('./user')
const Service = require('./service')
const CompanyService = require('./companyService')
const User = require('./user')
const Company = require('./company')
const CompanyMechanic = require('./companyMechanic')
const CompanyAlert = require('./companyAlert')
const FcmToken = require('./fcmToken')
const Job = require('./jobs')
const MechanicJob = require('./mechanicJob')
const FuelPrice = require('./fuelPrice')

module.exports = {
    user: new User(),
    service: new Service(),
    company: new Company(),
    companyService: new CompanyService(),
    companyMechanic: new CompanyMechanic(),
    companyAlert: new CompanyAlert(),
    fcmToken: new FcmToken(),
    job: new Job(),
    mechanicJob: new MechanicJob(),
    fuelPrice: new FuelPrice()
}