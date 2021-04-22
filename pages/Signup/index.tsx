import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import styled from '@emotion/native';
import axios from 'axios';

const Signup = ({ navigation }: any) => {
  // const [email, onchangeEmail] = useInput('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const handleSignUp = useCallback(() => {
    // console.log(email, nickname, password, passwordCheck);
    axios
      .post('http://localhost:3095/api/users', {
        email,
        nickname,
        password,
      })
      .then(() => {
        setSignUpSuccess(true);
      }) // 성공
      .catch((error) => {
        // console.dir(error.response.data);
        setSignUpError(error.response.data);
      }) // 실패
      .finally(() => {}); // 무조건 실행
  }, [email, nickname, password]);

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
        <Text>닉네임</Text>
        <View>
          <Input placeholder="Nickname" value={nickname} onChangeText={(text) => setNickname(text)} />
        </View>
      </Label>
      <Label>
        <Text>비밀번호</Text>
        <View>
          <Input secureTextEntry placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
        </View>
      </Label>
      <Label>
        <Text>비밀번호 확인</Text>
        <View>
          <Input
            secureTextEntry
            placeholder="Password Check"
            value={passwordCheck}
            onChangeText={(text) => setPasswordCheck(text)}
          />
        </View>
        {/*{mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}*/}
        {/*{!nickname && <Error>닉네임을 입력해주세요.</Error>}*/}
        {signUpError && <Error>{signUpError}</Error>}
        {signUpSuccess && <Error>회원가입되었습니다! 로그인해주세요.</Error>}
      </Label>
      <Submit title="회원가입" onPress={handleSignUp} />
      <Submit title="로그인 하러가기" onPress={() => navigation.navigate('Login')} />
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
  margin: 0 0 5px;
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

export default Signup;
