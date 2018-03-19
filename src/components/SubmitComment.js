import React from "react";
import Helmet from "react-helmet";

const FormOption = props => {
  const optParts = props.option.split(".");
  const name = `options[${optParts.join("][]")}]`;
  return <input name={name} value={props.value} type="hidden" />;
};

const Labelled = props => {
  var requiredText = "";
  if (!props.required) {
    requiredText = (
      <span>(optional)</span>
    );
  }

  return (
    <label>
      <div>
        {props.label} {requiredText}
      </div>
      {props.children}
    </label>
  );
};

const LabelledInput = props => {
  return (
    <Labelled label={props.label} required={props.required}>
      <input name={props.name} type={props.type} placeholder={props.placeholder} />
    </Labelled>
  );
};

const ReCaptcha = () => {
  return null;
  const siteKey = "xxxxx";
  const secret = "xxxx";
  return (
    <div>
      <helmet>
        <script src="https://www.google.com/recaptcha/api.js" />
      </helmet>
      <div className="g-recaptcha" data-sitekey={siteKey} />
      <FormOption option="reCaptcha.siteKey" value={siteKey} />
      <FormOption option="reCaptcha.secret" value={secret} />
    </div>
  );
};

class SubmitComment extends React.Component {
  render() {
    const formUrl =
      "https://api.staticman.net/v2/entry/username/repository/master/comments";
    const returnUrl = this.props.url;
    const slug = this.props.slug;
    return (
      <form method="POST" action={formUrl} css={{}}>
        <legend>Submit a Comment</legend>
        <FormOption option="redirect" value={returnUrl} />
        <FormOption option="slug" value={slug} />

        <LabelledInput
          label="Name"
          name="fields[name]"
          type="text"
          placeholder="Your Name"
          required
        />

        <LabelledInput
          label="E-mail"
          name="fields[email]"
          type="email"
          placeholder="your.name@example.com"
          required
        />

        <LabelledInput
          label="Website"
          name="fields[url]"
          type="url"
          placeholder="http://example.com/"
        />

        <Labelled label="Message" required>
          <textarea
            name="fields[message]"
          />
        </Labelled>

        <Labelled
          label="I want to be notified of new comments"
          required
        >
          <div>
            <input type="checkbox" name="options[subscribe]" />
          </div>
        </Labelled>

        <ReCaptcha />

        <div>
          <button>Comment</button>
        </div>
      </form>
    );
  }
}

export default SubmitComment;
