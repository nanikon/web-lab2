<%--
  Created by IntelliJ IDEA.
  User: natan
  Date: 21.10.2021
  Time: 9:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true"%>
<%
    String message = exception.getMessage();
    String exceptionType = exception.getClass().toString();
%>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <title>Ошибка!</title>
</head>
<body>
<div class="blocks">
    <div>
        <h2>Exception occurred while processing the request</h2>
        <p>Type: <%= exceptionType%></p>
        <p>Message: <%= message %></p>
    </div>
</div>
</body>
</html>
