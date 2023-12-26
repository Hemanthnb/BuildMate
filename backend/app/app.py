import json
#from flask import Flask, jsonify,request
from flask_cors import CORS
import requests
import os
import subprocess
import pyautogui
import time
import fileinput
from flask import Flask, render_template, request, jsonify

import subprocess
import time
import json
import xml.etree.ElementTree as ET


app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return app.send_static_file('index.html')

commands = ['2']
gradlePath=""
mavenPath=""
automationName=""
buildTool=""

def create_folder_and_send_commands():
    folder_name = "Gradle_Project"
    path = os.path.join(os.path.expanduser('~'), 'Desktop', folder_name)
    global gradlePath
    gradlePath=path
    try:
        os.makedirs(path)
        print(f"Folder '{folder_name}' created successfully at {path}")
    except FileExistsError:
        print(f"Folder '{folder_name}' already exists at {path}")
        return False;

    # Open Terminal
    subprocess.run(['open', '-a', 'Terminal', path])

    # Wait for Terminal to open (adjust the sleep time as needed)
    time.sleep(2)
    

    pyautogui.typewrite('gradle init\n')
    time.sleep(10)  # Wait for the 'gradle init' command to complete (adjust as needed)

    commands = ['2', '3', '', '2', '2', '', '', '', '']
    for command in commands:
        pyautogui.typewrite(f'{command}\n')
        time.sleep(2)  
    return True

def fetch_versions(group_id,artifact_id):
    print("group_id = ",group_id)
    url = f"https://search.maven.org/solrsearch/select?q=g:%22{group_id}%22+AND+a:%22{artifact_id}%22&core=gav&rows=20&wt=json"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    return data

def generate_gradle_dependencies(group_id,artifact_id,json_response):
    data = json.loads(json_response)
    latest_version = data["response"]["docs"][0]["v"]
    gradle_dependency = f"implementation group: '{group_id}', name: '{artifact_id}', version: '{latest_version}'"
    return gradle_dependency

def add_gradle_dependency(final_dependency):
    gradle_file_path = gradlePath+"/app/build.gradle"
    string_to_append = final_dependency
    with fileinput.FileInput(gradle_file_path, inplace=True) as file:
        for line in file:
            if line.strip() == 'dependencies {':
                print(line, end='')  # Print the current line
                print(f'    {string_to_append}')  # Append the new string
            else:
                print(line, end='')  # Print the current line


@app.route('/options', methods=['POST'])
def receive_data():
    data = request.json.get('data')
    if data is not None:
        commands.append(data)
    # Process data here
    print('Data received:', commands)
    return jsonify({'message': 'Data received successfully'})

@app.route('/gradle', methods=['POST'])
def create_gradle_project():
    if create_folder_and_send_commands():
        global buildTool
        buildTool="Gradle"
        return "true"
    return "false"


def fetch_maven_dependencies(dependencies_list):
    MAVEN_REPO_API = "https://search.maven.org/solrsearch/select?q=g:{group_id}%20AND%20a:{artifact_id}&core=gav"
    all_dependencies = []
    dependencies_list = [
                    ('io.rest-assured', 'rest-assured'),
                    ('com.fasterxml.jackson.core', 'jackson-databind'),
                    ('org.testng', 'testng'),
                    ('io.qameta.allure', 'allure-testng'),
                    ('io.qameta.allure', 'allure-rest-assured'),
                ]
    for group_id, artifact_id in dependencies_list:
        api_url = MAVEN_REPO_API.format(group_id=group_id, artifact_id=artifact_id)
        response = requests.get(api_url)
        if response.status_code == 200:
            try:
                dependencies = parse_maven_response(response.text)
                all_dependencies.extend(dependencies)
            except ET.ParseError as e:
                print(f"Failed to parse XML response: {e}")
                print(response.text)
        else:
            print(f"Failed to fetch Maven dependencies for {group_id}:{artifact_id}. Status code: {response.status_code}")

    return all_dependencies


def parse_maven_response(response_text):
    dependencies = set()
    data = json.loads(response_text)
    for doc in data['response']['docs']:
        group_id = doc['g']
        artifact_id = doc['a']
        version = doc['v']
        dependency = (group_id, artifact_id, version)

        if dependency not in dependencies:
            dependencies.add(dependency)
            break
    return dependencies

def wait_for_file(file_path, timeout=60):
    start_time = time.time()
    while not os.path.exists(file_path):
        if time.time() - start_time > timeout:
            print(f"Timeout reached. File '{file_path}' not found.")
            return False
        time.sleep(1)
    return True

@app.route('/maven', methods=['POST'])
def generate_project():
    global buildTool
    buildTool="Maven"
    folder_name = "Maven_Project"
    maven_archetype="quickstart"
    path = os.path.join(os.path.expanduser('~'), 'Desktop', folder_name)
    try:
        os.makedirs(path)
        print(f"Folder '{folder_name}' created successfully at {path}")
    except FileExistsError:
        print(f"Folder '{folder_name}' already exists at {path}")
    
    maven_command = f'mvn archetype:generate -DgroupId=com.example -DartifactId={folder_name} -DarchetypeArtifactId=maven-archetype-{maven_archetype} -DinteractiveMode=false'
    subprocess.run(['osascript', '-e', f'tell application "Terminal" to do script "cd {path} && {maven_command}"'])
    global mavenPath
    mavenPath=path
    

    
    pom_path= os.path.join(path, f"{folder_name}/pom.xml")
    if wait_for_file(pom_path):
        if automationName == 'API Automation':
            dependencies_list = [
                ('io.rest-assured', 'rest-assured'),
                ('com.fasterxml.jackson.core', 'jackson-databind'),
                ('org.testng', 'testng'),
                ('io.qameta.allure', 'allure-testng'),
                ('io.qameta.allure', 'allure-rest-assured'),
            ]
            dependencies = fetch_maven_dependencies(dependencies_list)
            update_pom_with_dependencies(pom_path, dependencies)
        elif automationName == 'Mobile Automation' :
            dependencies_list = [
                ('org.testng', 'testng'),
                ('io.appium', 'java-client'),
                ('org.seleniumhq.selenium', 'selenium-java'),
                ('io.qameta.allure', 'allure-testng'),
                ('io.qameta.allure', 'allure-rest-assured'),
                ('org.projectlombok', 'lombok')
            ]
            dependencies = fetch_maven_dependencies(dependencies_list)
            update_pom_with_dependencies(pom_path, dependencies)
        elif automationName == 'Web Automation' :
            dependencies_list = [
                ('org.testng', 'testng'),
                ('org.seleniumhq.selenium', 'selenium-java'),
                ('io.qameta.allure', 'allure-testng'),
                ('io.qameta.allure', 'allure-rest-assured'),
                ('org.projectlombok', 'lombok')
            ]
            dependencies = fetch_maven_dependencies(dependencies_list)
            update_pom_with_dependencies(pom_path, dependencies)    

        else:
            print("Exiting due to timeout.")

    return jsonify({'message': f'{tool.capitalize()} {project_type.capitalize()} project generation started.'})

def update_pom_with_dependencies(pom_path, dependencies):
    tree = ET.parse(pom_path)
    root = tree.getroot()

    # Create a <dependencies> element if it doesn't exist
    dependencies_elem = root.find('.//dependencies')
    if dependencies_elem is None:
        dependencies_elem = ET.SubElement(root, 'dependencies')

    # Check existing dependencies to avoid duplicates
    existing_dependencies = {(dep.find('groupId').text, dep.find('artifactId').text) for dep in dependencies_elem.findall('dependency')}

    # Add only new dependencies to the <dependencies> element
    for group_id, artifact_id, version in dependencies:
        if (group_id, artifact_id) not in existing_dependencies:
            dependency_elem = ET.SubElement(dependencies_elem, 'dependency')


def update_pom_with_dependencies(pom_path, dependencies):
    tree = ET.ElementTree()
    root = ET.Element("project")
    tree._setroot(root)

    # Add necessary attributes to the root element
    root.set("xmlns", "http://maven.apache.org/POM/4.0.0")
    root.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
    root.set("xsi:schemaLocation", "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd")

    # Add necessary elements
    model_version = ET.SubElement(root, "modelVersion")
    model_version.text = "4.0.0"

    group_id = ET.SubElement(root, "groupId")
    group_id.text = "org.com"  # Replace with your actual group ID

    artifact_id = ET.SubElement(root, "artifactId")
    artifact_id.text = "Mobile_Framework_Sample"  # Replace with your actual artifact ID

    version = ET.SubElement(root, "version")
    version.text = "1.0-SNAPSHOT"

    packaging = ET.SubElement(root, "packaging")
    packaging.text = "jar"

    name = ET.SubElement(root, "name")
    name.text = "Mobile_Framework_Sample"

    url = ET.SubElement(root, "url")
    url.text = "http://maven.apache.org"

    properties_elem = ET.SubElement(root, "properties")
    build_source_encoding = ET.SubElement(properties_elem, "project.build.sourceEncoding")
    build_source_encoding.text = "UTF-8"

    compiler_source = ET.SubElement(properties_elem, "maven.compiler.source")
    compiler_source.text = "11"

    compiler_target = ET.SubElement(properties_elem, "maven.compiler.target")
    compiler_target.text = "11"

    aspectj_version = ET.SubElement(properties_elem, "aspectj.version")
    aspectj_version.text = "1.9.6"

    dependencies_elem = ET.SubElement(root, "dependencies")

    # Add dependencies to the <dependencies> element
    for group_id, artifact_id, version in dependencies:
        dependency_elem = ET.SubElement(dependencies_elem, 'dependency')
        group_id_elem = ET.SubElement(dependency_elem, 'groupId')
        group_id_elem.text = group_id
        artifact_id_elem = ET.SubElement(dependency_elem, 'artifactId')
        artifact_id_elem.text = artifact_id
        version_elem = ET.SubElement(dependency_elem, 'version')
        version_elem.text = version

    # Save the updated pom.xml file
    tree.write(pom_path, encoding="utf-8", xml_declaration=True)







@app.route('/final', methods=['POST'])
def print_hello():
    indices = [2, 5,6, 7, 8]
    for index in indices:
        commands.insert(index, '')
    return commands

@app.route('/reset', methods=['POST'])
def reset_commands():
    commands.clear()
    commands.append('2')
    global automationName
    automationName=""
    global buildTool
    buildTool=""
    print("Commands = ",commands)
    return ''

@app.route('/setauto', methods=['POST'])
def setAutoInfo():
    data_received = request.json.get('data')
    print("data = ",data_received)
    global automationName
    automationName=data_received
    print("Auto name = ",automationName)
    return ""

@app.route('/adddependency',methods=['POST'])
def addDependency():
    print("Automation name =",automationName,"Build Tool",buildTool)
    if(buildTool=="Gradle"):
        if automationName=="Web Automation" :
            group_id="org.seleniumhq.selenium"
            artifact_id="selenium-java"
            print("web executed")
        elif automationName=="Mobile Automation" :
            group_id="io.appium"
            artifact_id="java-client"
            print("mob executed")
        elif automationName=="API Automation":
            group_id="io.rest-assured"
            artifact_id="rest-assured"
            print("APi executed")
        data = fetch_versions(group_id,artifact_id)
        if data is not None:
            dependency=generate_gradle_dependencies(group_id,artifact_id,json.dumps(data))
            with open(f"{gradlePath}/app/build.gradle", "r") as file:
                content = file.read()
            if dependency not in content:
                index = content.find('dependencies {')
                insert_position = index + len('dependencies {') + 1
                updated_content = content[:insert_position] + f"\n    {dependency}\n" + content[insert_position:]
                with open(f"{gradlePath}/app/build.gradle", "w") as file:
                    file.write(updated_content)
                print("Dependency added to build.gradle")
            else:
                print("Dependency already exists in build.gradle")
    return "nothing"
        

    

if __name__ == '__main__':
    app.run(debug=True, port=3090)
