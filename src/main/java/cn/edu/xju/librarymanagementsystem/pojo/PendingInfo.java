package cn.edu.xju.librarymanagementsystem.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PendingInfo {
    private String userId;
    private String userName;
    private String modifyProject;
    private String gender;
    private Date birthday;
}
