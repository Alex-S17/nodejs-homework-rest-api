const createEmailBody = (email, verificationToken) => {
  return {
    to: email,
    from: "maxim.solidsoft@meta.ua",
    subject: "Email confirmation required",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email</a>`,
  };
};

module.exports = {
  createEmailBody,
};
