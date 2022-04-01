# SynergyTask

### Before running
Before starting application you need to install all Node dependencies using:

###npm install

To containerize project, use:

####sudo docker-compose up --build

To create built front-end, open front-end project and type:

###npm run build

In order to create .zip file, type:

###sudo zip -r -9 aws.zip server/ client/ mysql/ .env db.env docker-compose.yml Dockerfile nginx.conf

It will create zip file in the corner of project

Then, open AWS, in search form type "Elastic Beanstalk", there will be "Create application" button, click it

Type the name of your application, choose docker platform of the latest version and create application

Then you need to wait a few minutes and there you will be able to upload your containerized project to AWS


