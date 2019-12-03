import Vue from "vue";
import Router from "vue-router";
import ErrorPage from '../views/Error'
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Users from "../views/users/Index";
import Roles from "../views/roles/Index";
import PayFrequencies from "../views/payFrequencies/Index";
import SssContributionTables from "../views/sssContributionTables/Index";
import WithholdingTaxTables from "../views/withholdingTaxTables/Index";
import Employees from "../views/employees/Index";
import EmployeesView from "../views/employees/View";
import EmployeeSalariesAndAllowances from "../views/employeeSalariesAndAllowances/Index";
import Payrolls from "../views/payrolls/Index";
import PayrollsCreate from "../views/payrolls/Create";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/roles",
      name: "roles",
      component: Roles
    },
    {
      path: "/payFrequencies",
      name: "payFrequencies",
      component: PayFrequencies
    },
    {
      path: "/sssContributionTables",
      name: "sssContributionTables",
      component: SssContributionTables
    },
    {
      path: "/withholdingTaxTables",
      name: "withholdingTaxTables",
      component: WithholdingTaxTables
    },
    {
      path: "/employees",
      name: "employees",
      component: Employees
    },
    {
      path: "/employees/view/:id",
      name: "employeesView",
      component: EmployeesView
    },
    {
      path: "/employeeSalariesAndAllowances",
      name: "employeeSalariesAndAllowances",
      component: EmployeeSalariesAndAllowances
    },
    {
      path: "/payrolls",
      name: "payrolls",
      component: Payrolls
    },
    {
      path: "/payroll/create",
      name: "payrollsCreate",
      component: PayrollsCreate
    },
  ]
})

export default router
