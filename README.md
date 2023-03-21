
<p align="center">
 <img src="./images/TransactionsAPI.png" alt="Project logo">
</p>

<h3 align="center">Transactions</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
![Issues](https://img.shields.io/github/issues/jessicacastro/transactionsAPI)
![Forks](https://img.shields.io/github/forks/jessicacastro/transactionsAPI)
![Stars](https://img.shields.io/github/stars/jessicacastro/transactionsAPI)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
![Top Language](https://img.shields.io/github/languages/top/jessicacastro/transactionsAPI)
![Last Commit](https://img.shields.io/github/last-commit/jessicacastro/transactionsAPI)
![Tweet](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fjessicacastro%2FtransactionsAPI)
</div>

<p align="center">
  Application made with Fastify, Knex, ESLint, sqlite3, zod and Typescript for NodeJS.
  <br />
  Make sure that your transactions are controlled with this API.
  <br />
</p>


### Summary 📝

- [How to run the application 📌](#howtorun)
- [License 🔒](#license)
- [Functional Requirements 📂](#functional_requirements)
- [Business Rules 📂](#business_rules)
* * * * * * * * * * * * * * * *

### How to run the application 📌 <a name="howtorun"></a>

First of all, you need to install the Node on yout system. 

With the node installed, you can download and run the application using `npm run dev`.

Be sure to run the following command and set the environment variables accordingly to the example.

### License 🔒 <a name="license"></a>

This application is licensed under the MIT License. Check the [LICENSE](LICENSE.md) file for more information.
* * * * * * * * * * * * * * * *

### Functional Requirements 📂 <a name="functional_requirements"></a>

- The user can create a new transaction;
- The user can get a summary of his account transactions;
- The user can get the list of all transactions;
- The user can visualize a transaction details;

### Business Rules 📂 <a name="business_rules"></a>

- The transaction can have the types credit (it will be a sum on the amount) and debit (it will be a subtraction on the amount);
- It's possible indetificate the user on the requests;
- Users can only view the transaction if the transaction was created by him;

* * * * * * * * * * * * * * * *
