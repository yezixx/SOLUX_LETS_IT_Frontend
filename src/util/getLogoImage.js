import github from "../assets/toolLogo/github.png";
import slack from "../assets/toolLogo/slack.png";
import jira from "../assets/toolLogo/jira.svg";
import notion from "../assets/toolLogo/notion.png";
import figma from "../assets/toolLogo/figma.svg";
import discord from "../assets/toolLogo/discord.png";
import velog from "../assets/toolLogo/velog.png";
import tistory from "../assets/toolLogo/tistory.svg";
import naverblog from "../assets/toolLogo/naverblog.svg";
import linkedin from "../assets/toolLogo/linkedin.png";
import email from "../assets/toolLogo/email.svg";
import others from "../assets/toolLogo/others.svg";

export function getLogoImage(logoname) {
  switch (logoname) {
    case "github":
      return github;
    case "slack":
      return slack;
    case "discord":
      return discord;
    case "notion":
      return notion;
    case "jira":
      return jira;
    case "figma":
      return figma;
    case "velog":
      return velog;
    case "tistory":
      return tistory;
    case "naverblog":
      return naverblog;
    case "linkedin":
      return linkedin;
    case "email":
      return email;
    case "others":
      return others;
    default:
      return null;
  }
}
