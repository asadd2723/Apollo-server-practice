const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const  bodyParser  = require('body-parser')
const cors  = require('cors')
const axios = require('axios')

async function startServer (){
  const app = express();
  const server = new ApolloServer({
    typeDefs:  `
      type category {
        success: String
        data: [categorydetails]
      }
      type categorydetails {
        id: String
        name: String
        date: String
        created_at: String
        updated_at: String
      }
      type Query {
        viewallCategory: category 
      }
    `,

    
    

  //  typeDefs : `
  // type User {
  //   success: Boolean
  //   user: userdetails
  //   message: String
  // }
  // type userdetails {
  //   token: String
  //   name: String
  //   email: String
  // }
    
  // type Query {
  //   _: Boolean
  // }
  
  // type Mutation {
  //   login(email: String!, password: String!): User
  // }`,

//     {
//   "pin": 988,
//   "email": "asad@gmail.com",
//   "password": "asad"
// }
// make order mutation
// {
//   "input": {
//     "branchId": "3k3kk",
//     "cashierId": "fjfjwo9iok",
//     "callNumber": "39iid39",
//     "invoiceNumber": "sku-99ioj3",
//     "paymentMethod": "o0o0-009",
//     "paymentStatus": "PAID",
//     "reference": "someone",
//     "total": 203.39,
//   }
// }
    // resolvers:{
    //   Mutation: {
    //     login: async (_, { email, password }) => {
    //       try {
    //         // Send the email and password as part of the POST request
    //         const response = await axios.post('https://learning-apis.healthflowpro.com/api/login', {
    //           email,
    //           password
    //         });

    //         // Assuming the response contains the data in a format you want
    //         return response.data; // Replace with the correct response format
    //       } catch (error) {
    //         console.error(error);
    //         throw new Error('Error fetching todos');
    //       }
    //     },
    //   },
    // },
    resolvers:{
      Query: {
        viewallCategory: async () => {
          try {
            // Send the email and password as part of the POST request
            const response = await axios.get('https://learning-apis.healthflowpro.com/api/viewAllCategory');
            // Assuming the response contains the data in a format you want
            return response.data; // Replace with the correct response format
          } catch (error) {
            console.error(error);
            throw new Error('Error fetching todos');
          }
        },
      },
    },
  })

  app.use(bodyParser.json()); // For JSON data
  app.use(cors())
  await server.start()
  app.use('/graphql', expressMiddleware(server))

  app.listen( 8000 , ()=> console.log("server started at PORT 8000"))

}

startServer()