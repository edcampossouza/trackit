import axios from "axios";
import { URL } from "../constants";

export function fetchTodaysHabits(user, setTodayHabits) {
  if (user && user.token && setTodayHabits) {
    axios
      .get(`${URL}/habits/today`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setTodayHabits(res.data);
      })
      .catch((err) => alert(JSON.stringify(err.response.data)));
  }
}

export function fetchHabits(user, setHabits, setLoading) {
  if (setLoading) setLoading(true);
  axios
    .get(`${URL}/habits`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      setHabits(res.data);
      if (setLoading) setLoading(false);
    })
    .catch((err) => {
      alert(JSON.stringify(err.response.data));
      if (setLoading) setLoading(false);
    });
}
