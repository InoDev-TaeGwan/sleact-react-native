import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/native';
import { Text, View } from 'react-native';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const Login: FC = ({ navigation }: any) => {
  const { data, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  console.log(data);
  useEffect(() => {
    if (data) {
      return navigation.navigate('Workspace');
    }
  }, [data, navigation]);
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          { email, password },
          {
            withCredentials: true, // 백엔드 서버와 프론트 서버의 포트번호가 달라서 쿠키전달이 안돼서 설정. post에서는 3번째에 넣을것.
          },
        )
        .then(() => {
          revalidate(); // 로그인 성공할때 fetcher 실행, revalidate가 실행되면 리랜더링됨
        })
        .catch((error) => {
          console.dir(error);
          setLoginError(error.response?.data?.statusCode === 401);
        })
        .finally(() => {});
    },
    [revalidate, email, password],
  );

  if (data === undefined) {
    return <Text>로딩중...</Text>;
  }

  return (
    <Container>
      <Header>Slick</Header>
      <Label>
        <Text>이메일 주소</Text>
        <View>
          <Input
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </Label>
      <Label>
        <Text>비밀번호</Text>
        <View>
          <Input secureTextEntry placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
        </View>
      </Label>
      {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
      <Submit title="로그인" onPress={handleLogin} />
      <Submit title="회원가입" onPress={() => navigation.navigate('Signup')} />
    </Container>
  );
};

const Container = styled.View`
  padding: 0 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
  //background-color: blue;
`;
const Header = styled.Text`
  text-align: center;
  //font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Label = styled.View`
  width: 100%;
  margin-bottom: 16px;
  & > span {
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    font-weight: 700;
  }
`;
const Input = styled.TextInput`
  border-radius: 4px;
  border: 1px solid black;
  margin: 0 0 20px;
  width: 100%;
  padding: 11px 12px 13px 12px;
  height: 44px;
  font-size: 18px;
  color: black;
`;

const Submit = styled.Button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background-color: #4a154b;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

const Error = styled.Text`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export default Login;
