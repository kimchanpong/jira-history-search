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
                "jql":`project=NGCPO AND due >= ${this.state.startDate} AND due <= ${this.state.endDate} AND assignee in (${this.state.adAccount}) order by updated DESC`, "maxResults":200
            }
        )

        const getListEih = await api.callApi('GET', url, {
                "jql":`project=EIH AND resolved >= ${this.state.startDate} AND resolved <= ${this.state.endDate} AND watcher in (${this.state.adAccount}) order by updated DESC`, "maxResults":200
            }
        )

        const mergeList = getList['issues'].concat(getListEih['issues']);

        this.setState({
            historyList: mergeList,
            loading: false
        });
    }

    renderLoading = () => {
        console.log('renderLoading :: ', this.state.loading)
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

                <Box
                    sx={{
                        marginTop: 1
                    }}
                >
                    <TextField
                        id="startDate"
                        name="startDate"
                        label="기한 시작일시"
                        helperText="월간보고 시작 기준일(ex: 2022-01-01)"
                        onChange={this.handleTag.bind(this)}
                    />
                    <TextField
                        id="endDate"
                        name="endDate"
                        label="기한 종료일시"
                        helperText="월간보고 종료 기준일(ex: 2022-12-31)"
                        onChange={this.handleTag.bind(this)}
                    />
                </Box>
                <Divider />
                <Box
                    sx={{
                        marginTop: 1
                    }}
                >
                    <TextField
                        id="userName"
                        name="userName"
                        label="사용자명"
                        helperText="노트북 로그인계정의 등록 소유자명(ex: 홍길동)"
                        onChange={this.handleTag.bind(this)}
                    />
                    <TextField
                        id="adAccount"
                        name="adAccount"
                        label="AD 계정"
                        helperText="노트북 로그인 계정(ex: Hong.Kildong)"
                        onChange={this.handleTag.bind(this)}
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: 1
                    }}
                >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        조회
                    </Button>
                </Box>
                <Box sx={{
                    marginTop: 1,
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