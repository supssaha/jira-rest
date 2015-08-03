/**
 * jira
 * Copyright(c) 2014-2015
 * @author: Pradeep Patro <pradeeppatro16@gmail.com>
 *          Lovely Upadhyay <lovely.upadhyay@gmail.com>
 * MIT Licensed
 */
(function(){
    var request = require('request');

    module.exports = jiraConnect;

    function jiraConnect (options) {
        this.config = options.config;
    }

    jiraConnect.prototype.fetchProjects = function fetchProjects (callback) {
        console.log("Connection Started");
        var cb = callback || null,
        endpoint = this.config.urilist.projects;
        options = {
            url: endpoint,
            json: true,
            headers: {
                'Authorization' : this.config.authorization
            }
        };
        console.log(options);
        request(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                if (typeof cb === 'function') {
                    cb(body);
                } else {
                    return body;
                }
            } else {
                throw new Error("jira > lib > fetchProjects", error);
            }
        });
    };

    jiraConnect.prototype.fetchProject = function fetchProject (projectid, callback) {
        var cb = callback || null,
        endpoint = this.config.urilist.project.replace(/{projectid}/, projectid);
        options = {
            url: endpoint,
            json: true,
            headers: {
                'Authorization' : this.config.authorization
            }
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                if (typeof cb === 'function') {
                    cb(body);
                } else {
                    return body;
                }
            } else {
                throw new Error("jira > lib > fetchProject", error);
            }
        });
    };

    jiraConnect.prototype.fetchProjectVersions = function fetchProjectVersions (projectid, callback) {
        var cb = callback || null,
        endpoint = this.config.urilist.versions.replace(/{projectid}/, projectid);
        options = {
            url: endpoint,
            json: true,
            headers: {
                'Authorization' : this.config.authorization
            }
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                if (typeof cb === 'function') {
                    cb(body);
                } else {
                    return body;
                }
            } else {
                throw new Error("jira > lib > fetchProjectVersions", error);
            }
        });
    };

    jiraConnect.prototype.fetchProjectVersion = function fetchProjectVersion (projectid, versionid) {
        var endpoint = this.config.urilist.version.replace(/{projectid}/, projectid)
            .replace(/{versionid}/, versionid);
            console.log(endpoint, "// fetchProjectVersion");
        return {};
    };
}());
