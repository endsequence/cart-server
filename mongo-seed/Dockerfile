FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db cart-db --collection products --drop --type json --file /init.json --jsonArray
