const { json } = require("body-parser")
const express = require("express")
const app = express()
const PORT = 6969
const userData = require("./MOCK_DATA.json")
const graphql = require("graphql")
const {GraphQLSchema,GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLList}=graphql

const{graphqlHTTP}=require("express-graphql")
const { query } = require("express")
const { type } = require("os")


let userType = new GraphQLObjectType({
    name:"user",
    fields:()=>({
        id: {type:GraphQLInt},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        email: {type:GraphQLString},
        password: {type:GraphQLString}
,

    })
})

let rootQuery = new GraphQLObjectType({
    name:"RootQueryTy",
    fields:{
        getAllUsers:{
            type:new GraphQLList(userType),
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
                return userData
            }
        }
    }
})

const Mutation =  new GraphQLObjectType({
    name:"mutation",
    fields:{
        createUser:{
            type:userType,
            args:{
                firstName: {type:GraphQLString},
                lastname: {type:GraphQLString},
                email: {type:GraphQLString},
                password: {type:GraphQLInt}
                
            },
            resolve(parent,args ){
                userData.push({id:userData.length + 1,first_name:args.first_name,last_name:args.last_name,email:args.email,password:args.password})
                return args
            }
        }
        
    }
})
const schema = new GraphQLSchema({query:rootQuery,mutation:Mutation  })


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(PORT,()=>{
    console.log("6969 port ");
})