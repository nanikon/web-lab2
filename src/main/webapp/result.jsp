<%--
  Created by IntelliJ IDEA.
  User: natan
  Date: 21.10.2021
  Time: 2:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <title>Выстрел!</title>
</head>
<body>
<header>
    <p>
        Натворила: Никонова Наталья Игоревна<br>
        Группа: P3212<br>
        Вариант: 52583<br>
    </p>
</header>
<main role="main">
    <div class="blocks">
        <div>
            <h1>Результаты выстрела:</h1>
            <table>
                <thead>
                <tr>
                    <th>x</th>
                    <th>y</th>
                    <th>r</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${applicationScope.get(header['User-Agent']).lastPoint.x}</td>
                    <td>${applicationScope.get(header['User-Agent']).lastPoint.y}</td>
                    <td>${applicationScope.get(header['User-Agent']).lastPoint.r}</td>
                </tr>
                </tbody>
            </table>
            <h2>
                ${applicationScope.get(header['User-Agent']).lastPoint.isHit}
            </h2>
            <div class="for_link"><a href="${pageContext.request.contextPath}">Выстрелить ещё раз!</a></div>
        </div>
    </div>
</main>
</body>
</html>
