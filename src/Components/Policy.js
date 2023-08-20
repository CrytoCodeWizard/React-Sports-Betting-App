import { Card, CardBody, Typography } from "@material-tailwind/react";
 
export default function Policy(policy) {

    function TermsOfUse (){
        return (<div>
            <p>Last updated 8/19/2023</p>

            <p>Welcome to Shop the Line! These terms of use (the "Terms") govern your use of our website, which can be accessed at <a href="http://shopthe-line.com/" target="_blank" rel="noopener noreferrer">shopthe-line.com</a>. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms,
                please do not access or use our website. We reserve the right to update these Terms at any time. Any changes to these Terms will be effective immediately upon posting on our website. Your continued use of our website after any changes to these Terms constitutes your acceptance of the revised Terms.</p>

            <Typography className="mb-3" variant="h4">Liability</Typography>
            <p>This site is for entertainment purposes & involves no actual betting. We are not liable for any actions that you take on third-party sites based on the data that we provide. 
                The data that we provide is for informational purposes only and it is your responsibility to verify the accuracy of the data before taking any action.
                We make no guarantees about the accuracy or completeness of the data, and we are not responsible for any losses that you may incur as a result of using the data.
                Gambling addiction is a serious problem that can affect anyone. If you are concerned that you or someone you know may have a gambling addiction, please seek help.</p>

            <Typography className="mb-3" variant="h4">Intellectual Property</Typography>
            <p>We do not claim ownership of any of the intellectual property of any third party, including but not limited to trademarks, copyrights, patents, or trade secrets. 
                The information about third-party operators that is shown on our website is the property and responsibility of the third-party operators themselves. We do not claim ownership of this information.
                By using our website, you agree that you will not use any of our content in a way that infringes on the intellectual property rights of us or any third party.</p>

            <Typography className="mb-3" variant="h4">Prohibited Use</Typography>
            <p>The following activities are prohibited on our website:<br/><br/>
                <li>Web scraping: The unauthorized use of automated tools to extract data from our website.</li><br/>
                <li>Denial-of-service attacks: Any attempt to disrupt the availability of our website.</li><br/>
                We actively monitor traffic to and from our website. We reserve the right in our sole discretion to block certain IP addresses if we suspect suspicious activity, 
                such as automated or robotic activity, or activity that is harmful to our website or our users.</p>

            <Typography className="mb-3" variant="h4">Age Restrictions</Typography>
            <p>This website contains betting-related information and is intended for use by individuals who are of legal betting age in their state or territory. In the United States, the legal betting age is 21.
                If you are under the legal betting age in your state or territory, you are not permitted to use this website.
                By using this website, you are representing that you are of legal betting age in your state or territory.</p>

                <Typography className="mb-3" variant="h4">Contact Us</Typography>
            <p>If you have any questions or complaints about the use of our Services, please contact us at <b>team@shopthe-line.com</b></p>
        </div>)
    }

    function PrivacyPolicy(){
        return (<div>
            <p>Last updated 8/19/2023</p>

            <p>This Privacy Policy applies to information collected about you by the Shop the Line website. Please read this Privacy Policy carefully before using our Services.
                 By using our Services, you agree to the data collection practices and purposes outlined in this Privacy Policy.</p>

                 <Typography className="mb-3" variant="h4">Information Collected From You</Typography>
            <p>If you contact us with feedback or to request support, we may collect your name, email address, and any other information you provide to us, in order to respond to your request. 
                We will use this information only for the purpose of responding to your request and will not share it with any third parties.</p>


            <Typography className="mb-3" variant="h4">Information Automatically Collected</Typography>
            <p>We use Netlify Site Analytics, a server-side GDPR-compliant service, to collect data about how users interact with our website.
            The data collected may include your browser type, operating system, IP address, domain name, click-activity, referring website, and date/time stamp. We do not collect any personal information about you, such as your name, email address, or contact information.
            We use this information for monitoring and analytical purposes only.</p>

            <Typography className="mb-3" variant="h4">Third-Party Advertising</Typography>
            <p>We use third-party advertising companies to serve ads on our website. These companies may use cookies to track your browsing activity on our website and on other websites in order to show you relevant ads. 
                You can opt out of third-party ad tracking by visiting the Network Advertising Initiative: <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">optout.networkadvertising.org</a> website.
            Google, as a third-party vendor, uses cookies to serve ads on our website. Google's use of the advertising cookie enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the internet.
            Users may opt out of the use of the advertising cookie for interest-based advertising by visiting the Google Ad Settings: <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">adssettings.google.com/authenticated</a> page.</p>

            

            <Typography className="mb-3" variant="h4">Third-Party Links</Typography>
            <p>Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's website. We strongly advise you to review the privacy policy of every website you visit.
                We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party websites or services.</p>

                <Typography className="mb-3" variant="h4">Session & Local Storage</Typography>
            <p>We use session and local storage to store certain information on your device, such as the current tab that you are viewing. 
                This information is not personally identifiable and is used to improve your experience on our website. You can opt-out of this data collection by clearing your cookies and local storage.</p>

                <Typography className="mb-3" variant="h4">Minors</Typography>
            <p>
                Our website is intended for a general audience and does not knowingly collect or store contact information about children under the age of 18 in the United States or the 
                appropriate age for services directed toward children as defined under applicable laws in other jurisdictions.</p>

                <Typography className="mb-3" variant="h4">Updates</Typography>
            <p>
            We reserve the right to update this Privacy Policy at any time. Changes to this Privacy Policy will be effective as soon as they are posted on this page. You are advised to check this page periodically for any changes.</p>

                <Typography className="mb-3" variant="h4">Contact Us</Typography>
            <p>If you have any questions or complaints about this Privacy Policy, please contact us at <b>team@shopthe-line.com</b></p>
        </div>)
    }

  return (
    <div>
        <Card className="hidden lg:block max-w-screen-md h-[40rem] overflow-y-auto">
            <CardBody>
                <Typography className="flex justify-center font-bold border-b border-blue-gray-50 mb-3" variant="h2">{policy.title}</Typography>

                {policy.title === "Terms of Use" ?
                    <TermsOfUse/>
                : policy.title === "Privacy Policy" ?
                    <PrivacyPolicy/>
                :<></>}

            </CardBody>
        </Card>

        <Card className="lg:hidden w-80 h-[40rem] overflow-y-auto">
            <CardBody>
                <Typography className="flex justify-center font-bold border-b border-blue-gray-50 mb-3" variant="h2">{policy.title}</Typography>

                {policy.title === "Terms of Use" ?
                    <TermsOfUse/>
                : policy.title === "Privacy Policy" ?
                    <PrivacyPolicy/>
                :<></>}

            </CardBody>
        </Card>
    </div>
  );
}