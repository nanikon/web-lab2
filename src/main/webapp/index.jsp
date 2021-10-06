<%--
  Created by IntelliJ IDEA.
  User: natan
  Date: 06.10.2021
  Time: 22:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    pageContext.setAttribute("currentUserData", application.getAttribute(request.getHeader("User-Agent")));
%>

<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/main.css">
    <title>Первый бой</title>
</head>
<body>
<header>
    <p>
        Натворила: Никонова Наталья Игоревна<br>
        Группа: P3212<br>
        Вариант: 12014<br>
    </p>
</header>
<main role="main">
    <h1>Виртуальный тир: испытай свою меткость!</h1>
    <div class="blocks">
        <div>
            <img src="img/fieldRed.png" alt="field">
        </div>
        <div>
            <div class="to-form">
                <form id="input-data" method="get">
                    <p id="x-input">
                        Координата точки X: <br>
                        <label><input type="text" name="x"></label> <br>
                        <span class="hide">Х должна быть числом между [-3, 5]</span>
                    </p>
                    <p id="y-input">
                        Координата точки Y: <br>
                        <label><input type="button" name="y" value="-2"></label>
                        <label><input type="button" name="y" value="-1.5"></label>
                        <label><input type="button" name="y" value="-1"></label>
                        <label><input type="button" name="y" value="-0.5"></label>
                        <label><input type="button" name="y" value="0"></label>
                        <label><input type="button" name="y" value="0.5"></label>
                        <label><input type="button" name="y" value="1"></label>
                        <label><input type="button" name="y" value="1.5"></label>
                        <label><input type="button" name="y" value="2"></label> <br>
                        <span class="hide">Y должно быть выбрано одно только одно и лишь из представленных здесь</span>
                    </p>
                    <p id="r-input">
                        Радиус области R: <br>
                        <label><input type="checkbox" name="r[]" value="1"> 1 </label> <br>
                        <label><input type="checkbox" name="r[]" value="2"> 2 </label> <br>
                        <label><input type="checkbox" name="r[]" value="3"> 3 </label> <br>
                        <label><input type="checkbox" name="r[]" value="4"> 4 </label> <br>
                        <label><input type="checkbox" name="r[]" value="5"> 5 </label> <br>
                        <span class="hide">R должно быть выбрано только одно и лишь из представленных здесь</span>
                    </p>
                    <p><input type="submit" value="Отправить" id="submit"></p>
                </form>
            </div>
        </div>
    </div>
    <h2>Результаты:</h2>
    <div id="result-table">
        <c:choose>
            <c:when test="${applicationScope.header['User-Agent'] == null}">
                <h3>Вы пока не отправили ни один результат</h3>
            </c:when>
            <c:otherwise>
                <table>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Попали?</th>
                        </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="point" items="${currentUserData}">
                        <tr>
                            <td>${point.x}</td>
                            <td>${point.y}</td>
                            <td>${point.r}</td>
                            <td>${point.isHit}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </c:otherwise>
        </c:choose>
    </div>
</main>
</body>
</html>