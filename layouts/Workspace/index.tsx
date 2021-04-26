import React, { useCallback, useState } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import styled from '@emotion/native';
import MenuImg from '../../svg/MenuImg';
import Menu from '../../components/Menu';

const Workspace = () => {
  // svg는 컴포넌트로 분리하여 만들 것. 모듈은 react-native-svg 사용
  // 일반 이미지는 Image 컴포넌트 사용
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onCloseUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  return (
    <View>
      <Header>
        <LeftMenu>
          <View>
            <MenuImg width="40px" height="40px" />
          </View>
        </LeftMenu>
        <RightMenu>
          <Pressable onPress={onClickUserProfile}>
            <ProfileImage
              source={{
                uri: 'https://via.placeholder.com/40',
              }}
            />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <ProfileModal>
                  <Image
                    source={{
                      uri: 'https://via.placeholder.com/20',
                    }}
                  />
                  <Text>테스트</Text>
                </ProfileModal>
              </Menu>
            )}
          </Pressable>
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
  line-height: 25px;
`;
const RightMenu = styled.View`
  color: #ffffff;
  border: 1px solid #fff;
`;
const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
`;
const ProfileModal = styled.View`
  display: flex;
  padding: 20px;
  & img {
    display: flex;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  & #profile-name {
    font-weight: bold;
    //display: inline-flex;
  }
  & #profile-active {
    font-size: 13px;
    //display: inline-flex;
  }
`;
export default Workspace;
