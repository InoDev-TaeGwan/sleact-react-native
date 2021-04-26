import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import Menu from '../../svg/Menu';


const Workspace = () => {
  return (
    <View>
      <Header>
        <LeftMenu>
          <View>
            <Menu width="25px" height="25px" />
          </View>
        </LeftMenu>
        <RightMenu>
          <View>
            <ProfileImage
              source={{
                uri: 'https://via.placeholder.com/40',
              }}
            />
          </View>
        </RightMenu>
      </Header>
    </View>
  );
};

const Header = styled.View`
  height: 50px;
  background: #350d36;
  color: #ffffff;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const LeftMenu = styled.View`
  border: 1px solid #fff;
`;
const RightMenu = styled.View`
  color: #ffffff;
  border: 1px solid #fff;
`;
const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
`;
export default Workspace;
