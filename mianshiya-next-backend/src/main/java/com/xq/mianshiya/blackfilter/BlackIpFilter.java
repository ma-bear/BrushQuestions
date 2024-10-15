package com.xq.mianshiya.blackfilter;


import com.xq.mianshiya.utils.NetUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * @author xq
 * @create 2024/10/15 16:12
 */
@WebFilter(value = "/*", filterName = "blackIpFilter")
public class BlackIpFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String ipAddress = NetUtils.getIpAddress((HttpServletRequest) servletRequest);
        if (BlackIpUtils.isBlackIp(ipAddress)) {
            servletResponse.setContentType("text/html;charset=utf-8");
            servletResponse.getWriter().write("您的IP已被拉黑，请联系管理员");
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }
}
