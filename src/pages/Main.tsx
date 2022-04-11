import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

interface MemberProps {
  avatar_url: string;
  login: string;
}

const Main: React.FC = () => {
  const [members, setMembers] = useState<MemberProps[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/members').then(resp => {
      resp.json().then(data => {
        setMembers(data);
      })
    })
  }, []);

  return(
    <FlatList 
      contentContainerStyle={{padding: 24}}
      data={members}
      keyExtractor={member => member.login}
      renderItem={({item: member}) => (
        <View style={styles.member}>
          <Image style={styles.image} source={{uri: member.avatar_url}}/>
          <Text>{member.login}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  }
})

export default Main;
