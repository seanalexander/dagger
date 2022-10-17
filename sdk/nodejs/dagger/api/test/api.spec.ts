import Api from "../api.js"
import assert from 'assert';

describe('NodeJS SDK api', function () {
  it('Get a the workdir id', async function () {
    const tree = await new Api().Host().Workdir().Read().Id().compute()
    console.log("🚀 ~ file: api.spec.ts ~ line 10 ~ tree", tree)

    // console.log("🚀 ~ file: api.test.mjs ~ line 11 ~ tree", tree)
    // assert.equal(tree.query, 'query ($name: String!, $path: String!, $url: String!) { git (url: $url) { branch (name: $name) { tree  { file (path: $path) { id } } } } }')
  })
});