import api from "../api/axios";

const getFooterLinks = async () => {
  const res = await api.get("sitecontent/footer-links/");
  return res.data;
};

const getNewsletter = async () => {
  const res = await api.get("sitecontent/newsletter/");
  return res.data;
};

export default { getFooterLinks, getNewsletter };
