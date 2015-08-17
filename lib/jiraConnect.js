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
        console.log("Connection Started for fetching all projects");
        var cb = callback || null,
            endpoint = this.config.urilist.projects,
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body);
                } else {
                    cb({error: error, module:"jira:fetchProjects"}, null);
                }
            }
            return;
        });
    };

    jiraConnect.prototype.fetchProject = function fetchProject (config, callback) {
        console.log("Connection Started for fetching the project "+config.projectid);
        var cb = callback || null,
            endpoint = this.config.urilist.project.replace(/{projectid}/, config.projectid),
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body, config);
                } else {
                    cb({error: error, module:"jira:fetchProject"}, null, config);
                }
            }
            return;
        });
    };

    jiraConnect.prototype.fetchProjectVersions = function fetchProjectVersions (config, callback) {
        console.log("Connection Started for fetching project "+config.projectid+"'s all versions");
        var cb = callback || null,
            endpoint = this.config.urilist.versions.replace(/{projectid}/, config.projectid),
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body, config);
                } else {
                    cb({error: error, module:"jira:fetchProjectVersions"}, null, config);
                }
            }
            return;
        });
    };

    jiraConnect.prototype.fetchProjectVersion = function fetchProjectVersion (config, callback) {
        console.log("Connection Started for fetching rapidview "+config.rapidviewid+"'s versionid "+ config.versionid);
        var cb = callback || null,
            endpoint = this.config.urilist.version.replace(/{rapidviewid}/, config.rapidviewid)
               .replace(/{versionid}/, config.versionid),
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body, config);
                } else {
                    cb({error: error, module:"jira:fetchProjectVersion"}, null, config);
                }
            }
            return;
        });
    };

    jiraConnect.prototype.fetchProjectSprints = function fetchProjectSprints (config, callback) {
        var cb = callback || null,
            endpoint = this.config.urilist.sprints.replace(/{projectid}/, config.projectid),
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body, config);
                } else {
                    cb({error: error, module:"jira:fetchProjectSprints"}, null, config);
                }
            }
        });
    };

    jiraConnect.prototype.fetchProjectSprint = function fetchProjectSprint (config, callback) {
        var cb = callback || null,
            endpoint = this.config.urilist.sprint.replace(/{rapidviewid}/, config.rapidviewid)
                .replace(/{sprintid}/, config.sprintid),
            options = {
                url: endpoint,
                json: true,
                headers: {
                    'Authorization' : this.config.authorization
                }
            };
        request(options, function(error, response, body) {
            if (typeof cb === 'function') {
                if (!error && response.statusCode === 200) {
                    cb(null, body, config);
                } else {
                    cb({error: error, module:"jira:fetchProjectSprint"}, null, config);
                }
            }
        });
    };

}());
