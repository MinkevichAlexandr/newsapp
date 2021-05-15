import React from "react";
import Toolbar from "../components/toolbar";
import styles from "../styles/About.module.css";

export default function About({ userData }) {
  return (
    <div>
      <Toolbar />
      <div className={styles.aboutContent}>
        <h4>
          {userData.first_name} {userData.last_name}
        </h4>
        <img src={userData.photo_200} alt="avatar" />
        <h5>
          {userData.city.title}, {userData.country.title}
        </h5>
        <a href="https://vk.com/alexandr_70">https://vk.com/alexandr_70</a>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const userDataRaw = await fetch(
    `https://api.vk.com/method/users.get?user_ids=alexandr_70&fields=photo_200,city,country&access_token=${process.env.VK_SECRET_KEY}&v=5.52`
  );
  const { response } = await userDataRaw.json();
  console.log(response);
  return {
    props: {
      userData: response[0],
    },
  };
};
