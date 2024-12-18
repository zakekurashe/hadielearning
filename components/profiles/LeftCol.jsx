import { toImageUrl } from "@/config/APIs";
import { styles } from "@/config/styles";
import { Avatar, Card, Tag } from "antd";
import React from "react";
import { BsYoutube } from "react-icons/bs";
import { FaBehance, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export const CardieBg = {
  // backgroundImage: `linear-gradient( 329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)`,
  background: styles.primaryColor,
};

const LeftCol = ({ user, skills, social, bio }) => {
  return (
    <div class="col-lg-3 border-right ">
      <Card style={CardieBg}>
        <div class="d-flex flex-column align-items-center text-center p-3 pt-5">
          {user?.image?.url && <Avatar class="mt-5" src={toImageUrl(user?.image?.url)} style={{ height: "150px", width: "150px" }} />}

          <span class="text-light mt-3">
            <b>{user?.name}</b>
          </span>
          <span class="text-light">{bio?.slice(0, 50)}...</span>
        </div>
        {skills && (
          <>
            <hr />
            <div className="d-flex flex-wrap justify-content-center">
              {skills?.map((x, index) => (
                <Tag key={index} className="my-1" color="green">
                  {x}
                </Tag>
              ))}
            </div>
          </>
        )}

        {social && (
          <>
            <hr />
            <span className="d-flex justify-content-center align-items-center gap-3">
              {social?.youtube && (
                <a href={social?.youtube} target="_blank">
                  <BsYoutube size={25} color="white" />
                </a>
              )}
              {social?.instagram && (
                <a href={social?.instagram} target="_blank">
                  <FaInstagram size={25} color="white" />
                </a>
              )}

              {social?.facebook && (
                <a href={social?.facebook} target="_blank">
                  <FaFacebook size={25} color="white" />
                </a>
              )}

              {social?.linkedin && (
                <a href={social?.linkedin} target="_blank">
                  <FaLinkedin size={25} color="white" />
                </a>
              )}

              {social?.behance && (
                <a href={social?.behance} target="_blank">
                  <FaBehance size={25} color="white" />
                </a>
              )}
              {social?.github && (
                <a href={social?.github} target="_blank">
                  <FaGithub size={25} color="white" />
                </a>
              )}
            </span>
          </>
        )}
      </Card>
    </div>
  );
};

export default LeftCol;
