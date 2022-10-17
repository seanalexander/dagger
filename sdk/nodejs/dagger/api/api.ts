import  { query } from 'gql-query-builder'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { Engine, GraphQLClient, gql } from "../dist/index.js";

// type QueryType = {
//   operation?: string, 
//   variables?: {}, 
//   fields?: [QueryType] | []
// }

export default class Api {

  queryTree: IQueryBuilderOptions | IQueryBuilderOptions[]
  
  constructor() {
    this.queryTree = []
  }

  Host() {
    this.queryTree = {
      operation: 'host'
    }
    return this
  }

  Workdir() {
    this.queryTree = {
      ...this.queryTree,
      fields: [{workdir: []}]
    }
   return this 
  }
  
  Read() {
    //@ts-ignore
    this.queryTree.fields[0].workdir.push({read: []})
    this.queryTree = {
      ...this.queryTree,
    //@ts-ignore
      fields: [ this.queryTree.fields[0] ]
    }
    
    return this
  }

  Id() {
    //@ts-ignore
    this.queryTree.fields[0].workdir[0].read.push({id: []})

    this.queryTree = {
      ...this.queryTree,
      //@ts-ignore
      fields: [ this.queryTree.fields[0] ]
    }
    return this
  }

  // Git(url: string) {
  //     this.queryTree = {
  //       operation: 'git',
  //       variables: {
  //           url: {
  //             name: "url",
  //             type: "String!",
  //             value: url,
  //           },
  //       },
  //       fields: []
  //     }
  //     return this
  // }

  // Branch(name: string) {
  //   this.queryTree.fields = [{
  //     operation: 'branch',
  //     variables: {
  //         name: {
  //           name: "name",
  //           type: "String!",
  //           value: name,
  //         },
  //     },
  //     fields: []
  //   }]

  //   return this
  // }
  
  // Tree() {
  //   this.queryTree.fields[0].fields = [{
  //     operation: 'tree',
  //     fields: [{
  //       operation: "file",
  //       fields: ["id"],
  //       variables: {
  //         path: {
  //           name: "path",
  //           type: "String!",
  //           value: "README.md"
  //         }
  //       }
  //     }],
  //     variables: {},
  //   }]

  //   return this
  // }

  async compute(){
    // run the query and return the result.
    const queryBuilt = query(this.queryTree).query

    const result = new Promise(function(resolve) { 
      new Engine({}).run(async (client: GraphQLClient) => {
      await client
        .request(
          gql`${queryBuilt}`
        ).then(data => resolve(data.host.workdir.read.id));
    })})

    return result;
  }
}
