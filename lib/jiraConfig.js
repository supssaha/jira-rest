/**
 * jira
 * Copyright(c) 2014-2015
 * @author: Pradeep Patro <pradeeppatro16@gmail.com>
 *          Lovely Upadhyay <lovely.upadhyay@gmail.com>
 * MIT Licensed
 */
(function(){
    var btoa = require('btoa');

    module.exports = jiraConfig;

    function jiraConfig (options) {
        if (typeof options !== 'object') {
            throw new TypeError('Config should contain "url" and "authorization" key \nExample:-  \n{\n\t"url": "http://www.jira.com",\n\t"authorization": "Basic abcdefghijklmnopqrstuvwxyz"\n}');
        }
        if ('url' in options && 'authorization' in options) {
            this.resturi = options.url;
            if (typeof options.authorization === 'string') {
                this.authorization = options.authorization;
            } else if (typeof options.authorization === 'object') {
                this.authorization = 'Basic ' + btoa( options.authorization.user + ':' + options.authorization.pass);
            }
            this.ssl = this.resturi.match(/^https/) !== null ? true : false;
            var path = "/jira/rest";
            this.urilist = jiraConfig.getUrls(this.resturi, path);
        } else {
            throw new TypeError('Config should contain "url" and "authorization" key \nExample:-  \n{\n\t"url": "http://www.jira.com",\n\t"authorization": "Basic abcdefghijklmnopqrstuvwxyz"\n}');
        }
    }

    /**
     * Create a new Connection instance.
     * @param {string} uri
     * @param {string} path
     * @public
     */
    jiraConfig.getUrls = function getUrls (uri, path) {
        var urilist = {
            projects : uri + path + '/api/2/project',
            project  : uri + path + '/api/2/project/{projectid}',
            versions : uri + path + '/api/2/project/{projectid}/versions',
            version  : uri + path + '/greenhopper/1.0/rapid/charts/versionreport?rapidViewId={rapidviewid}&versionId={versionid}'
        };
        return urilist;
    };
}());
