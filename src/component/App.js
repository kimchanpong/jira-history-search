import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios/index";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            endEate: '',
            userName: '',
            adAccount: '',
            getList: [{}]
        }
    }

    componentDidMount() {
       this.getHistory();
    }

    callApiGet = (url, params) => {
        return axios.get(url, {
                params: params,
                headers: {
                    Authorization: 'Basic ',
                    'Content-type': 'application/json'
                    }
                }
            )
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    callApiPost = (url, params) => {
        return axios.post(url, params, {
            config: {
                headers: {
                    'Authorization': 'Basic ',
                    'Content-Type': 'application/json'
                }
            }
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('callApiPost fail!!', error);
        });
    }

    getHistory = async () => {
        const url = '/rest/api/2/search';
        const getList = await this.callApiGet(url, {
                "jql":" project=NGCPO AND due >= 2022-04-01 AND due <= 2022-05-30 AND assignee in (Kim.ChanHo01) order by updated DESC", "maxResults":200
            }
        );

        this.setState({
            getList: getList
        })

        // return getList;
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

        console.log('state data :::: ', this.state);
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    render() {
        return(
            <div>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 5,
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                        helperText="월간보고 시작 기준일"
                        onChange={this.handleTag.bind(this)}
                    />
                    <TextField
                        id="endDate"
                        name="endDate"
                        label="기한 종료일시"
                        helperText="월간보고 종료 기준일"
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
                        helperText="노트북 로그인계정의 등록 소유자명"
                    />
                    <TextField
                        id="adAccount"
                        name="adAccount"
                        label="AD 계정"
                        helperText="노트북 로그인 계정"
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


            </Box>
                {this.state.getList}
            </div>
        )
    }
}

export default App;