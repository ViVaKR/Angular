export class UserDTO {
  /**
   * 
   * @param fullName 
   * @param email 
   * @param userName 
   * @param dateCreated 
   */
  constructor(
    public fullName:string,
    public email:string,
    public userName:string,
    public dateCreated:Date,
    public token: string,
    public role: string) {}
}

/**
 * public string   FullName    { get; set; }
 public string   Email       { get; set; }
 public string   UserName    { get; set; }
 public DateTime DateCreated { get; set; }
 public string   Token       { get; set; }
 public string   Role        { get; set; }
 */
