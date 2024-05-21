import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { payConfirm } from '../store';
import { useMyContextController } from '../store'; // Import Context

const ConfirmOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceName, servicePrice, imageUrl } = route.params; 

  const [controller] = useMyContextController();
  const { userLogin } = controller; 

  const [confirming, setConfirming] = useState(false); 

  const userName = userLogin ? userLogin.name : "Tên người dùng mẫu"; 

  const handleConfirm = async () => {
    try {
      setConfirming(true); 

      const paymentSuccess = await payConfirm(userName, serviceName, servicePrice);

      if (paymentSuccess) {
        console.log('Thanh toán thành công!');
        navigation.navigate('Home');
      } else {
        console.log('Thanh toán thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi xác nhận thanh toán:', error);
    } finally {
      setConfirming(false); 
    }
  };

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      )}
      <View style={styles.textRow}>
        <Text style={styles.label}>Dịch vụ:</Text>
        <Text style={styles.text}>{serviceName}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Giá dịch vụ:</Text>
        <Text style={styles.text}>{servicePrice} VNĐ</Text>
      </View>
      <Button
        title={confirming ? "Đang xác nhận..." : "Xác nhận"}
        onPress={handleConfirm}
        disabled={confirming} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    width: 400,
    height: 50,
  }
});

export default ConfirmOrder;
