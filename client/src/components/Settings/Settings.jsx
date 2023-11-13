import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/user/UserContext";
import { useFormik } from "formik";
import { userUpdationSchema } from "../../validationSchemas/ValidateSchema";
import { Publish } from "@mui/icons-material";
import storage from "../../firebase";
import "./Settings.scss";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateUser } from "../../context/user/UserApi";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, dispatch } = useContext(AuthContext);
  const [profile_pic, setProfile_Pic] = useState("");
  const [showFile, setShowFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = user;

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: userUpdationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, actions) => {
      setMessage("sending info...");
      if (profile_pic !== "") {
        upload(profile_pic)
          .then((url) => {
            values = { ...values, profile_pic: url };
            updateUser(values, dispatch)
              .then((resp) => {
                setMessage("Updated Successfully.");
              })
              .catch((err) => setMessage("Updation failed."))
              .finally(() => {
                setProgress(0);
                setProfile_Pic("");
                setShowFile("");
                setTimeout(() => {
                  setMessage("");
                }, 2000);
              });
          })
          .catch((err) => {
            setMessage("Updation failed.");
          })
          .finally(() => {
            setProgress(0);
            setProfile_Pic("");
            setShowFile("");
            setTimeout(() => {
              setMessage("");
              navigate("/settings");
            }, 2000);
          });
      } else {
        const obj = {
          ...user,
          fname: values.fname,
          lname: values.lname,
          age: values.age,
          gender: values.gender,
          mobile: values.mobile,
        };
        updateUser(obj, dispatch)
          .then((resp) => {
            setMessage("Updated Successfully.");
          })
          .catch((err) => setMessage("Updation failed."))
          .finally(() => {
            setProfile_Pic("");
            setProgress(0);
            setShowFile("");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          });
      }
    },
  });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };
  const upload = (item) => {
    return new Promise((resolve, reject) => {
      if (item) {
        const fileName = item.name + new Date().getTime();
        const storageRef = ref(storage, `/items/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
            switch (snapshot.state) {
              case "paused":
                // console.log("paused...");
                break;
              case "running":
                // console.log("uploading...");
                break;
              case "success":
                // console.log("uploaded");
                break;
              default: break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // console.log("not authorized ");
                break;
                case "storage/canceled":
                  // console.log("cancelled");
                  break;
                  case "storage/unknown":
                    // console.log("unknown storage");
                    break;
                  default: break;
            }
            reject(error);
          },
          () => {
            if (profile_pic && user.profile_pic) {
              try {
                const oldPicRef = ref(storage, user.profile_pic);
                getMetadata(oldPicRef)
                  .then(() => {
                    deleteObject(oldPicRef)
                      .then(() => {
                        // console.log("Old profile picture deleted successfully");
                      })
                      .catch((err) => {
                        // console.error("Error deleting old profile picture:");
                      });
                  })
                  .catch((error) => {
                    // console.error("Error checking existence of old profile picture:");
                  });
              } catch (err) {
                // console.error("Error checking existence of old profile picture:");
              }
            }
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                resolve(url);
              })
              .catch((err) => {
                reject(err);
              });
          }
        );
      } else {
        reject("");
      }
    });
  };

  return (
    <div className="update-container">
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="update-form">
        <div className="username-email">
          <div className="user_id">
            <span>Id: </span>
            {user._id}
          </div>
          <div className="username">
            <span>username: </span>
            {user.username}
          </div>
          <div className="email">
            <span>email: </span>
            {user.email}
          </div>
        </div>
        <div className="full-name-gender-age">
          <div className="all">
            <div className="full-name">
              <div className="fname">
                <input
                  onKeyDown={handleKeyPress}
                  type="text"
                  name="fname"
                  id="fname"
                  autoComplete="off"
                  placeholder="first name"
                  value={values.fname || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {touched.fname && errors.fname ? (
                  <p className="form-error">{errors.fname}</p>
                ) : null}
              </div>
              <div className="lname">
                <input
                  onKeyDown={handleKeyPress}
                  type="text"
                  name="lname"
                  id="lname"
                  autoComplete="off"
                  placeholder="last name"
                  value={values.lname || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {touched.lname && errors.lname ? (
                  <p className="form-error">{errors.lname}</p>
                ) : null}
              </div>
            </div>

            <div className="gender">
              <label htmlFor="gender" style={{borderBottom: "1px solid lightgray", fontWeight: '300', display: 'inline-block'}}>Gender: </label>
              <label>
                Male
                <input  
                  onKeyDown={handleKeyPress}
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <label>
                Female
                <input
                  onKeyDown={handleKeyPress}
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <label>
                Other
                <input
                  onKeyDown={handleKeyPress}
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  checked={values.gender === "other"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
            </div>

            <div className="age">
              <input
                onKeyDown={handleKeyPress}
                type="number"
                name="age"
                id="age"
                autoComplete="off"
                placeholder="Age"
                value={values.age || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.age && errors.age ? (
                <p className="form-error">{errors.age}</p>
              ) : null}
            </div>
          </div>
          <div className="profile-pic">
            <img src={user.profile_pic} alt="" />
            <label htmlFor="file">
              <span>{showFile}</span> <Publish />
            </label>
            <input
              onKeyDown={handleKeyPress}
              type="file"
              onChange={(e) => {
                if (e.target.files.length) {
                  setShowFile(e.target.files[0]?.name);
                  setProfile_Pic(e.target.files[0]);
                }
              }}
              id="file"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="mobile">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            onChange={handleChange}
            value={values.mobile || ""}
            onBlur={handleBlur}
            placeholder="Contact number"
            autoComplete="off"
            name="mobile"
            id="mobile"
          />{" "}
          {touched.mobile && errors.mobile ? (
            <p className="form-error">{errors.mobile}</p>
          ) : null}
        </div>
        <button type="submit" className="update-btn">
          UPDATE {progress ? `${progress}%` : null}
        </button>
      </form>
    </div>
  );
}

export default Settings;
