# simpleapi
simple nodejs API
https://lfnn.site/API/products

start: "nodemon index.js"


GET queries: 
/API/procuts?
id OR page&count&filter&type OR page&count&filter OR page&count&type OR page&count&name ORpage&count

examples
/API/products?count=12&page=1 (https://lfnn.site/API/products?count=12&page=1)
/API/products?count=12&page=1&type=bed (https://lfnn.site/API/products?count=12&page=1&type=bed)
/API/products?count=12&page=1&filter=red (https://lfnn.site/API/products?count=12&page=1&filter=red)
/API/products?count=12&page=1&filter=red,blue&type=bed (https://lfnn.site/API/products?count=12&page=1&filter=red,blue&type=bed)
/API/products?id=1 (https://lfnn.site/API/products?id=1)
filter: red, blue, green
type: bed || sofa || armchair

В зависимости от count query сервер фильтрует данные по условным страницам, возвращая общее количество страниц с count айтемов на странице в totalPages
page query обязателен к count query, влияет на номер условной страницы, которую должен веннуть сервер в [entities]

ответ в формате [[entities], totalPages]
