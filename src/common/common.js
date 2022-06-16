class CommonUtil {
    static get RestSearchUrl() {
        return '/rest/api/2/search';
    }

    static SearchQuerystring(type, state) {
        let querystring = '';
        if(type === 'NGCPO') {
            querystring = `project=NGCPO AND due >= ${state.startDate} AND due <= ${state.endDate} AND assignee in (${state.adAccount}) order by updated DESC`;
        } else {
            querystring = `project=EIH AND resolved >= ${state.startDate} AND resolved <= ${state.endDate} AND watcher in (${state.adAccount}) order by updated DESC`;
        }

        return querystring;
    }
}

export default CommonUtil;