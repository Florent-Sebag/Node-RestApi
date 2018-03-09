'use strict';

function convert_line(line)
{
  var res = "";
  var tmp = line.length;

  for (var i = 0; i < line.length; i++)
  {
    res += line[i];
    if (line[i] == ' ' && tmp < 81)
      {
        res += ' ';
        tmp += 1;
      }
  }
  return (res);
}

function justify_lines(str)
{
  var tab = str.split('\n');

  for (var i = 0; i < tab.length - 1; i++)
  {
    if (tab[i].length != 81)
      tab[i] = convert_line(tab[i]);
  }
  return (tab.join('\n'));
}

function put_new_line(str)
{
  var tmp = 0;
  var tab = str.split(' ');
  var res = "";

  for (var i = 0; i < tab.length; i++)
  {
    if (tab[i].includes("\n\n"))
      tmp = -1;
    if (tab[i].includes("\n"))
      tab[i] = tab[i].replace('\n', '');
    if (tmp + tab[i].length + 1 < 81)
    {
      res += tab[i] + ' ';
      tmp += tab[i].length + 1;
    }
    else
    {
      res += '\n';
      tmp = -1;
      i--;
    }
  }
  return ([res, tab.length]);
}

exports.convert_to_justify = function(str)
{
  // Put all the required \n
  var res = put_new_line(str);

  // Convert lines to 80 characters
  res[0] = justify_lines(res[0]);

  return ([res[0].substr(0, res[0].length - 1), res[1]]);
}
