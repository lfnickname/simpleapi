const express = require("express")
const https = require("https")
const url = require('url');
const jsonParser = express.json()
  fs = require("fs");

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = express();


  
const filePath = "mock.json";
app.get(`/api/products`, function(req, res){
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    const content = fs.readFileSync(filePath,"utf8");
    const products = JSON.parse(content);
    if (queryObject.id) {res.send(products.filter(item => item.id==queryObject.id));}
    else if (queryObject.count && queryObject.page && queryObject.filter && queryObject.type) {
      const count = queryObject.count
      const page = queryObject.page
      const type = queryObject.type
      const filter = queryObject.filter.split(',')
      const filtredData = products.filter(product => {
        let checker
        for (let i = 0; i<filter.length; i++) {
          if (product.tag.includes(filter[i])) checker = true
        }
        return checker
      })
      const typedAndFiltredData = filtredData.filter(item => item.type == type)
      const totalPages = Math.ceil(typedAndFiltredData.length/count)
      const result = typedAndFiltredData.filter((item, index) => index>=(page-1)*count && index<page*count)
      res.send([result, totalPages])
    }
    else if (queryObject.count && queryObject.page && queryObject.filter) {
      const count = queryObject.count
      const page = queryObject.page
      const filter = queryObject.filter.split(',')
      const filtredData = products.filter(product => {
        let checker
        for (let i = 0; i<filter.length; i++) {
          if (product.tag.includes(filter[i])) checker = true
        }
        return checker
      })
      // const filtredData = products.filter(product=>product.tag.includes(filter))
      const totalPages = Math.ceil(filtredData.length/count)
      const result = filtredData.filter((item, index) => index>=(page-1)*count && index<page*count)
      res.send([result, totalPages])
    }
    else if (queryObject.count && queryObject.page && queryObject.type) {
      const count = queryObject.count
      const page = queryObject.page
      const type = queryObject.type
      const typedData = products.filter(item => item.type == type)
      const totalPages = Math.ceil(typedData.length/count)
      const result = typedData.filter((item, index) => index>=(page-1)*count && index<page*count)
      res.send([result, totalPages])
    }
    else if (queryObject.count && queryObject.page && queryObject.name) {
      const count = queryObject.count
      const page = queryObject.page
      const name = queryObject.name
      const nameFiltred = products.filter(product => product.name.includes(name))
      const totalPages = Math.ceil(nameFiltred.length/count)
      const result = nameFiltred.filter((item, index) => index>=(page-1)*count && index<page*count)
      res.send([result, totalPages])
    }
    else if (queryObject.count && queryObject.page) {
      const count = queryObject.count
      const page = queryObject.page
      const totalPages = Math.ceil(products.length/count)
      const result = products.filter((item, index) => index>=(page-1)*count && index<page*count)
      res.send([result, totalPages])
    }
    else res.send(products);
});


https.createServer(options, app).listen(8000);