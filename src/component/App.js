import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import HistoryTable from "./HistoryTable";
import Variable from "../variable/variable";
import Interface from "../interface/interface";
import SearchForm from "./SearchForm";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            endDate: '',
            userName: '',
            adAccount: '',
            detail: {},
            loading: false,
            historyList: []
        }
    }

    getHistory = async () => {
        const url = Variable.ProxyUrl + Variable.JiraUrl + Variable.RestSearchUrl;
        const api = new Interface();

        let getList = await api.callApi('GET', url, {
                "jql":Variable.SearchQuerystring('NGCPO', this.state), "maxResults":200
            }
        )

        const getListEih = await api.callApi('GET', url, {
                "jql":Variable.SearchQuerystring('EIH', this.state), "maxResults":200
            }
        )

        const mergeList = getList['issues'].concat(getListEih['issues']);

        this.setState({
            historyList: mergeList,
            loading: false
        });
    }

    renderLoading = () => {
        this.setState({
           loading: true
        });
    }

    handleTag = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.renderLoading();
        this.getHistory();
    };

    render() {
        return(
            <Box
                component="form"
                onSubmit={this.handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 5,
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
            >
                <CssBaseline />

                <Typography component="h1" variant="h5">
                    지라 월간보고 추출
                </Typography>

                <SearchForm
                    handleTag={this.handleTag}
                />

                <Box sx={{
                    marginTop: 5,
                    marginBottom: 10
                }}>
                    {
                            this.state.loading ?
                                'Loading..'
                                :
                                this.state.historyList.length > 0 ?
                                    <HistoryTable historyList={this.state.historyList} />
                                    :
                                    '조회된 내역이 없습니다.'
                    }
                </Box>
            </Box>
        )
    }
}

export default App;