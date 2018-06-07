const RedShift = require("node-redshift");
    
function queryRedShift(query) {

    var client =  {
        "user": "bimaster",
        "database": "hpe_user",
        "password": "6oY9NnTsD",
        "port": "5439",
        "host": "listerbi.chn65jgo2gle.us-east-1.redshift.amazonaws.com"
    };

    var redClient = new RedShift(client, { rawConnection: true });
    console.time("dbsave");
    return new Promise((resolve, reject) => {

        redClient.connect(function (err) {
            if (err) { reject(err); }
            else {
                redClient.query(query
                , function (err, data) {
                    if (err) { throw err; }
                    else {
                        redClient.close();
                        resolve(data);

                    }
                });
            }
        });
    })

}

queryRedShift("SELECT first_name,last_name,email,job_title,company,department,city,mobile_phone,phone,fax,linkedin_url,twitter,language FROM  PARDOT_CONTACTS Where ( (lower(pardot_contacts.company) like lower('%oracle%')OR(lower(pardot_contacts.JOB_TITLE) like lower('%a%') ) OR (lower(pardot_contacts.department) like lower('%a%') )  ) OR (lower(pardot_contacts.Campaign) like lower('%a%') ) )").then(function(data) {
    console.log("Success");
    console.timeEnd("dbsave");

}).catch(function(err) {
    console.log(err);
});