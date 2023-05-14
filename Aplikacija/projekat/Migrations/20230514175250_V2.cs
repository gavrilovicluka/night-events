using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projekat.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Administratori");

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Organizatori",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Organizatori",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Organizatori",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "MuzickiIzvodjaci",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "MuzickiIzvodjaci",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Korisnici",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Korisnici",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Korisnici",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Administratori",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Administratori",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Administratori",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Administratori");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Administratori");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Administratori");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Organizatori",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Korisnici",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Administratori",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");
        }
    }
}
